import { DynamoDB } from "aws-sdk";
import { awsConfig } from "../aws-config";
import { addItemToDb} from "./db-utils/db.utils";
import { 
    getPafContractItem, 
    getNewCustomerContractItem,
    getRandom,
    oneOf,
    createItems,
    getNewCustomerItem,
    getNewPafItem,
    fewTimesOneOf,
    getContractPafItem } from "./fake-factories";
import { PriceAdjustmentFormula, CustomerContract, Customer, Building, Pod } from "./models";
import { ItemBase } from "./models/base";
import { Supplier } from "./models/supplier.interface";
import { getNewSupplierContractItem } from "./fake-factories/supplier-contract.factory";
import { getNewSupplierItem } from "./fake-factories/supplier.factory";
import { getNewBuildingEntranceItems } from "./fake-factories/building-entrance.factory";
import { ChildParentInternal } from "./models/internal/child-parent-item.internal.interface";
import { getNewBuildingItem } from "./fake-factories/building.factory";
import { getNewPodItem } from "./fake-factories/pod.factory";
import { getNewPodInspectionItems } from "./fake-factories/pod-inspection.factory";
import { getNewPodMaintenanceItems } from "./fake-factories/pod-maintenance.factory";
import { getNewPodDistributionNetworkItems } from "./fake-factories/pod-distribution-network.factory";

export const dynamoDoc = new DynamoDB.DocumentClient({
    region: awsConfig.region,
    endpoint: awsConfig.dynamoDbEndpoint
});

export const fillDynamoDbTable = function (idSeedStart: number = 100, elemCount: number = 10) {
    fillTable(awsConfig.dynamoDbTableName, idSeedStart, elemCount);
}

const fillTable = function (dynamoDbTableName: string, idSeedStart: number, elemCount: number) {
    // there will be 3 times less customers than contracts
    const contractsPerCustomer = 3;
    
    // there will be 3 times less pafs than contracts
    const contractsPerPaf = 3;

    // there will be 3 times less buildings than entrances
    const entrancePerBuilding = 3;

    // there will be 3 times less pod children (DNs, maintenances, inspections) than pods
    const childPerPod = 3;
    
    const customerIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const customerCount = +(elemCount / contractsPerCustomer).toFixed();

    const pafIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const pafsCount = +(2 * elemCount / contractsPerPaf).toFixed();

    const entranceIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const entranceCounts = elemCount;

    const buildingIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const buildingsCount = +(entranceCounts / entrancePerBuilding).toFixed();

    const podIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const podsCount = elemCount / 2;

    const podChildIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const podChildrenCount = +(podsCount / childPerPod).toFixed();

    // create pafs (common for customers and suppliers)
    const pafs = createItems(pafIdSeedStart, pafsCount, getNewPafItem);
    addArrayToDb(pafs, dynamoDbTableName, insertItem, insertDelay);

    // create customers
    const customers = createItems(customerIdSeedStart, customerCount, getNewCustomerItem);

    // create customer contracts
    const customerContracts = getCustomerContracts(idSeedStart, elemCount, customers);
    addArrayToDb(customerContracts, dynamoDbTableName, insertChildParentItem, insertDelay);

    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelationsCustomers = getPafContractLists(pafs, customerContracts.map(i=>i.db_item), contractsPerPaf);

    // create pafContracts for customers
    const contractPafsCustomers = pafContractRelationsCustomers.map(i=> getContractPafItem(i.paf, i.contract, false));
    addArrayToDb(contractPafsCustomers, dynamoDbTableName, insertItem, insertDelay);

    // create contractPafs for customers
    const pafContractsCustomers = pafContractRelationsCustomers.map(i=>getPafContractItem(i.contract, i.paf, false));
    addArrayToDb(pafContractsCustomers, dynamoDbTableName, insertItem, insertDelay);
    
    // create suppliers
    const suppliers = createItems(customerIdSeedStart, customerCount, getNewSupplierItem);

    // create supplier contracts
    const supplierContracts = getSupplierContracts(idSeedStart, elemCount, suppliers);
    addArrayToDb(supplierContracts, dynamoDbTableName, insertChildParentItem, insertDelay);

    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelationsSuppliers = getPafContractLists(pafs, supplierContracts.map(i=>i.db_item), contractsPerPaf);

    // create pafContracts for suppliers
    const contractPafsSuppliers = pafContractRelationsSuppliers.map(i=> getContractPafItem(i.paf, i.contract, true));
    addArrayToDb(contractPafsSuppliers, dynamoDbTableName, insertItem, insertDelay);

    // create contractPafs for suppliers
    const pafContractsSuppliers = pafContractRelationsSuppliers.map(i=>getPafContractItem(i.contract, i.paf, true));
    addArrayToDb(pafContractsSuppliers, dynamoDbTableName, insertItem, insertDelay);

    // create buildings
    const buildings = createItems(buildingIdSeedStart, buildingsCount, getNewBuildingItem);
    addArrayToDb(buildings, dynamoDbTableName, insertItem, insertDelay);

    //create entrances
    const entrances = getBuildingEntrances(entranceIdSeedStart, entrancePerBuilding, buildings);
    addArrayToDb(entrances, dynamoDbTableName, insertItem, insertDelay);

    // create pods
    const pods = createItems(podIdSeedStart, podsCount, getNewPodItem);
    addArrayToDb(pods, dynamoDbTableName, insertItem, insertDelay);

    //create inspections
    const inspections = getPodInspections(podChildIdSeedStart, childPerPod, pods);
    addArrayToDb(inspections, dynamoDbTableName, insertItem, insertDelay);

    //create maintenances
    const maintenances = getPodMaintenances(podChildIdSeedStart, childPerPod, pods);
    addArrayToDb(maintenances, dynamoDbTableName, insertItem, insertDelay);

    //create distribution networks
    const dns = getPodDistributionNetworks(podChildIdSeedStart, childPerPod, pods);
    addArrayToDb(dns, dynamoDbTableName, insertItem, insertDelay);
}

/**
 * Delay between insert commands
 */
const insertDelay = 200;

/**
 * Function for inserting data item into the DB
 * @param item - data item
 * @param dynamoDbTableName - table name
 */
function insertItem <T extends ItemBase> (item: T, dynamoDbTableName: string) {
    addItemToDb(item, dynamoDbTableName, dynamoDoc);
} 

function insertChildParentItem <T1 extends ItemBase, T2 extends ItemBase>(item: ChildParentInternal<T1, T2>, dynamoDbTableName: string)  {
    addItemToDb(item.db_item, dynamoDbTableName, dynamoDoc);
    addItemToDb(item.parent_db_item, dynamoDbTableName, dynamoDoc);
}

/**
 * Invokes the custom insert function (insertItemFunc) for each array item with the given delay in milliseconds
 * @param items - items collection
 * @param dynamoDbTableName - table name
 * @param insertItemFunc - custom insert function
 * @param delayMs - delay in milliseconds
 */
function addArrayToDb <T>(
    items: T[], 
    dynamoDbTableName: string, 
    insertItemFunc: (item:T, tableName: string) => void, delayMs: number) {

    if (!insertItemFunc) {
        return;
    }

    let i = 0;
    let stop = items.length;

    const timerId = setInterval(() => {
        insertItemFunc(items[i++], dynamoDbTableName);
        if (i >= stop) {
            clearInterval(timerId);
        }
    }, delayMs);
}

function getCustomerContracts(idSeedStart : number, elemCount: number, customers: Customer[]) {
    return getChildRecordsInternal(idSeedStart, elemCount, customers, getNewCustomerContractItem);
}

function getSupplierContracts(idSeedStart : number, elemCount: number, suppliers: Supplier[]) {
    return getChildRecordsInternal(idSeedStart, elemCount, suppliers, getNewSupplierContractItem);
}

function getBuildingEntrances(idSeedStart : number, childPerParent: number, buildings: Building[]) {
    return getChildMultiRecordsInternal(idSeedStart, childPerParent, buildings, getNewBuildingEntranceItems);
}

function getPodInspections(idSeedStart : number, childPerParent: number, pods: Pod[]) {
    return getChildMultiRecordsInternal(idSeedStart, childPerParent, pods, getNewPodInspectionItems);
}

function getPodMaintenances(idSeedStart : number,childPerParent: number, pods: Pod[]) {
    return getChildMultiRecordsInternal(idSeedStart, childPerParent, pods, getNewPodMaintenanceItems);
}

function getPodDistributionNetworks(idSeedStart : number, childPerParent: number, pods: Pod[]) {
    return getChildMultiRecordsInternal(idSeedStart,childPerParent, pods, getNewPodDistributionNetworkItems);
}

function getPafContractLists<TContract extends ItemBase>(pafs: PriceAdjustmentFormula[], contracts: TContract[], contractsPerPaf: number) {
    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelations: { paf: PriceAdjustmentFormula; contract: TContract }[] = [];

    for (let i = 0; i < pafs.length; i++) {
        // assign random contracts to each paf
        const thisPafContracts = fewTimesOneOf(contracts, contractsPerPaf, 10);

        thisPafContracts.forEach((c) => {
            pafContractRelations.push({
                paf: pafs[i],
                contract: c
            });
        });
    }

    return pafContractRelations;
}

function getChildRecordsInternal<T1, T2>(
    idSeedStart : number, 
    elemCount: number, parents: T1[], 
    createChildInternalFunc: (index: number, parent: T1) => T2): T2[] {
    const childRecords = [];

    for (let i = idSeedStart; i < idSeedStart + elemCount; i++){
        const contract = createChildInternalFunc(i++, oneOf(parents));
        childRecords.push(contract);
    }

    return childRecords;
}

function getChildMultiRecordsInternal<T1, T2>(
    idSeedStart : number, 
    childPerParent: number,
    parents: T1[], createChildrenInternalFunc: (index: number, parent: T1, childPerParent: number) => T2[]): T2[] {
        if(parents.length == 0){
            return [];
        }

        const childRecords = new Array<T2>();

        parents.forEach(p=> {
            const children = createChildrenInternalFunc(idSeedStart, p, childPerParent);
            children.forEach(c=>childRecords.push(c));
        });

    return childRecords;
}