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
    getContractPafItem, 
    getNewDnCirculationPumpItems,
    getNewDnControlUnitItems,
    getNewDnDistributionBlockItems,
    getNewDnDistrictHeatingStationItems,
    getNewDnExhaustSystemItems,
    getNewDnExpansionTankItems,
    getNewDnFittingItems,
    getNewDnFuelTankItems,
    getNewDnHeatExchangerItems,
    getNewDnHydraulicSwitchItems,
    getNewDnPressureControlItems,
    getNewDnThermoControlItems,
    getNewDnWaterStorageItems,
    getNewSupplierContractItem,
    getNewSupplierItem,
    getNewBuildingEntranceItems,
    getNewBuildingItem,
    getNewPodItem,
    getNewPodInspectionItems,
    getNewPodMaintenanceItems,
    getNewPodDistributionNetworkItems,
    getNewDnBoilerItems,
    getNewDnBurnerItems,
    getNewRepairItems,
    getNewDnActuatorItems
} from "./fake-factories";
import { PriceAdjustmentFormula, Customer, Building, Pod, PodDistributionNetwork, Repair } from "./models";
import { ItemBase } from "./models/base";
import { Supplier } from "./models/supplier/supplier.interface";
import { ChildParentInternal } from "./models/internal/child-parent-item.internal.interface";

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

    // 3 pod children (DNs, maintenances, inspections) per pod
    const childPerPod = 3;

    // 4 components per distribution network
    const componentsPerNetwork = 4;

    const repairsPerComponent = 2;
    
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

    const techCompIdSeedStart = idSeedStart * getRandom(idSeedStart);

    const repairIdSeedStart = idSeedStart * getRandom(idSeedStart);

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

    //create technical components and repaires
    const components = new Map<string, ItemBase[]>();
    const repairs = new Array<Repair>();

    //actuators
    const actuators = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnActuatorItems);
    components.set("actuator", actuators);

    //boilers
    const boilers = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnBoilerItems);
    components.set("boiler", boilers);
    
    //burners
    const burners = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnBurnerItems);
    components.set("burner", burners);

    //circulation pumps
    const circulation_pumps = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnCirculationPumpItems);
    components.set("circulation pump", circulation_pumps);

    //control units
    const control_units = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnControlUnitItems);
    components.set("control unit", control_units);


    //distribution blocks
    const distribution_blocks = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnDistributionBlockItems);
    components.set("distribution block", distribution_blocks);

    //district heating stations
    const district_heating_stations = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnDistrictHeatingStationItems);
    components.set("district heating station", district_heating_stations);

    //exhaust systems
    const exhaust_systems = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnExhaustSystemItems);
    components.set("exhaust system", exhaust_systems);

    //expansion tanks
    const expansion_tanks = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnExpansionTankItems);
    components.set("expansion tank", expansion_tanks);

    //fittings
    const fittings = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnFittingItems);
    components.set("fitting", fittings);

    //fuel-tanks
    const fuel_tanks = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnFuelTankItems);
    components.set("fuel tank", fuel_tanks);

    //heat exchangers
    const heat_exchangers = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnHeatExchangerItems);
    components.set("heat exchanger", heat_exchangers);

    //hydraulic switches
    const hydraulic_switches = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnHydraulicSwitchItems);
    components.set("hydraulic switch", hydraulic_switches);

    //pressure controls
    const pressure_controls = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnPressureControlItems);
    components.set("pressure control", pressure_controls);

    //thermo controls
    const thermo_controls = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnThermoControlItems);
    components.set("thermo control", thermo_controls);

    //water storages
    const water_storages = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnWaterStorageItems);
    components.set("water storage", water_storages);

    // insert components, create repairs for each of them 
    components.forEach((valueArray: ItemBase[], key: string)=> {
        addArrayToDb(valueArray, dynamoDbTableName, insertItem, insertDelay);

        valueArray.forEach((comp: ItemBase, ind: number) => {
            const compRepairs = getNewRepairItems(repairIdSeedStart+ ind*repairsPerComponent, comp, repairsPerComponent, key);
            compRepairs.forEach(r => repairs.push(r));
        });
    });

    //insert repairs
    addArrayToDb(repairs, dynamoDbTableName, insertItem, insertDelay);
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

function getPafContractLists<TContract extends ItemBase> (pafs: PriceAdjustmentFormula[], contracts: TContract[], contractsPerPaf: number) {
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

function getTechnicalcomponents<T>(
    idSeedStart : number, 
    childPerParent: number, 
    networks: PodDistributionNetwork[], 
    getComponent: (index: number, dn: PodDistributionNetwork, childCount: number) => T[]): T[] {

    return getChildMultiRecordsInternal(idSeedStart, childPerParent, networks, getComponent);
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
    parents: T1[], 
    createChildrenInternalFunc: (index: number, parent: T1, childPerParent: number) => T2[]): T2[] {
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