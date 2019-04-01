import { DynamoDB } from "aws-sdk";
import { awsConfig } from "../aws-config";
import { addItemToDb} from "./db-utils/db.utils";
import { 
    getPafContractItem, 
    getNewCustomerContractItems,
    getRandom,
    oneOf,
    createItems,
    getNewCustomerItem,
    getNewPafItem,
    fewTimesOneOf,
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
    getNewSupplierContractItems,
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
import { PriceAdjustmentFormula, Customer, Building, Pod, PodDistributionNetwork, Repair, SupplierContract, PodInspection, PodMaintenance } from "./models";
import { ItemBase, TechnicalComponentBase } from "./models/base";
import { Supplier } from "./models/supplier/supplier.interface";
import { getNewInvoiceItem } from "./fake-factories/invoice/invoice.factory";
import { getBuildingRepairItem } from "./fake-factories/n-to-m/building-repair.factory";
import { getCustomerContractBuildingItem } from "./fake-factories/n-to-m/customer-contract-building.factory";
import { getPafBuildingItem } from "./fake-factories/n-to-m/paf-building.factory";

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

    //repairs per component
    const repairsPerComponent = 2;

    //building_repairs
    const repairsPerBuilding = 2;

    //customer_contract_buildings
    const contractsPerBuilding = 2;

    //paf_buildings
    const pafsPerBuilding = 2;
    
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

    const invoiceIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const invoicesCount = podsCount * childPerPod * componentsPerNetwork * repairsPerComponent / 4;

    const dataCollections = new Map<string, number>();

    // create pafs (common for customers and suppliers)
    const pafs = createItems(pafIdSeedStart, pafsCount, getNewPafItem);
    addArrayToDb(pafs, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("paf", pafs.length);

    // create customers
    const customers = createItems(customerIdSeedStart, customerCount, getNewCustomerItem);
    addArrayToDb(customers, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("customer", customers.length);

    // create customer contracts
    const customerContracts = getCustomerContracts(idSeedStart, contractsPerCustomer, customers);
    addArrayToDb(customerContracts, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("customer_contract", customerContracts.length);

    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelationsCustomers = getPafContractLists(pafs, customerContracts, contractsPerPaf);

    // // create pafContracts for customers - not needed for now
    // const contractPafsCustomers = pafContractRelationsCustomers.map(i=> getContractPafItem(i.paf, i.contract, false));
    // addArrayToDb(contractPafsCustomers, dynamoDbTableName, insertItem, insertDelay);
    //dataCollections.set("customer_contract_paf", contractPafsCustomers,.length);

    // create contractPafs for customers
    const pafContractsCustomers = pafContractRelationsCustomers.map(i=>getPafContractItem(i.contract, i.paf, false));
    addArrayToDb(pafContractsCustomers, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("paf_customer_contract", pafContractsCustomers.length);
    
    // create suppliers
    const suppliers = createItems(customerIdSeedStart, customerCount, getNewSupplierItem);
    addArrayToDb(suppliers, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("supplier", suppliers.length);

    // create supplier contracts
    const supplierContracts = getSupplierContracts(idSeedStart, contractsPerCustomer, suppliers);
    addArrayToDb(supplierContracts, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("supplier_contract", supplierContracts.length);

    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelationsSuppliers = getPafContractLists(pafs, supplierContracts, contractsPerPaf);

    // // create pafContracts for suppliers - not needed for now
    // const contractPafsSuppliers = pafContractRelationsSuppliers.map(i=> getContractPafItem(i.paf, i.contract, true));
    // addArrayToDb(contractPafsSuppliers, dynamoDbTableName, insertItem, insertDelay);
    //dataCollections.set("supplier_contract_paf", contractPafsSuppliers.length);

    // create contractPafs for suppliers
    const pafContractsSuppliers = pafContractRelationsSuppliers.map(i=>getPafContractItem(i.contract, i.paf, true));
    addArrayToDb(pafContractsSuppliers, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("paf_supplier_contract", pafContractsSuppliers.length);

    // create buildings
    const buildings = createItems(buildingIdSeedStart, buildingsCount, getNewBuildingItem);
    addArrayToDb(buildings, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("building", buildings.length);

    //create entrances
    const entrances = getBuildingEntrances(entranceIdSeedStart, entrancePerBuilding, buildings);
    addArrayToDb(entrances, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("building_entrance", entrances.length);

    // create pods
    const pods = createItems(podIdSeedStart, podsCount, getNewPodItem);
    addArrayToDb(pods, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("pod", pods.length);

    //create inspections
    const inspections = getPodInspections(podChildIdSeedStart, childPerPod, pods, supplierContracts);
    addArrayToDb(inspections, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("pod_inspection", inspections.length);

    //create maintenances
    const maintenances = getPodMaintenances(podChildIdSeedStart, childPerPod, pods, supplierContracts);
    addArrayToDb(maintenances, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("pod_maintenance", maintenances.length);

    //create distribution networks
    const dns = getPodDistributionNetworks(podChildIdSeedStart, childPerPod, pods);
    addArrayToDb(dns, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("distribution_network", dns.length);

    //create technical components and repaires
    const components = new Map<string, TechnicalComponentBase[]>();
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
    components.set("circulation_pump", circulation_pumps);

    //control units
    const control_units = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnControlUnitItems);
    components.set("control_unit", control_units);


    //distribution blocks
    const distribution_blocks = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnDistributionBlockItems);
    components.set("distribution_block", distribution_blocks);

    //district heating stations
    const district_heating_stations = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnDistrictHeatingStationItems);
    components.set("district_heating_station", district_heating_stations);

    //exhaust systems
    const exhaust_systems = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnExhaustSystemItems);
    components.set("exhaust_system", exhaust_systems);

    //expansion tanks
    const expansion_tanks = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnExpansionTankItems);
    components.set("expansion_tank", expansion_tanks);

    //fittings
    const fittings = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnFittingItems);
    components.set("fitting", fittings);

    //fuel-tanks
    const fuel_tanks = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnFuelTankItems);
    components.set("fuel_tank", fuel_tanks);

    //heat exchangers
    const heat_exchangers = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnHeatExchangerItems);
    components.set("heat_exchanger", heat_exchangers);

    //hydraulic switches
    const hydraulic_switches = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnHydraulicSwitchItems);
    components.set("hydraulic_switch", hydraulic_switches);

    //pressure controls
    const pressure_controls = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnPressureControlItems);
    components.set("pressure_control", pressure_controls);

    //thermo controls
    const thermo_controls = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnThermoControlItems);
    components.set("thermo_control", thermo_controls);

    //water storages
    const water_storages = getTechnicalcomponents(techCompIdSeedStart, componentsPerNetwork, dns, getNewDnWaterStorageItems);
    components.set("water_storage", water_storages);

    //create invoices

    const invoices = createInvoices(invoiceIdSeedStart, invoicesCount, pods, suppliers);
    addArrayToDb(invoices, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("invoice", invoices.length);

    // insert components, create repairs for each of them 
    components.forEach((valueArray: TechnicalComponentBase[], key: string)=> {
        addArrayToDb(valueArray, dynamoDbTableName, insertItem, insertDelay);
        dataCollections.set(key, valueArray.length);

        valueArray.forEach((comp: TechnicalComponentBase, ind: number) => {
            const distributionNetworkId = comp.sk;
            const dn = dns.find(d => d.pk_id === distributionNetworkId);

            if(!dn) {
                return;
            }

            const podId = dn.sk;
            const podInvoices = invoices.filter(i=>i.sk === podId);
            const invoice = oneOf(podInvoices);

            if(!invoice) {
                return;
            }

            const compRepairs = getNewRepairItems(repairIdSeedStart+ ind*repairsPerComponent, comp, invoice, repairsPerComponent, key.replace('_', ' '));
            compRepairs.forEach(r => repairs.push(r));
        });
    });

    //insert repairs
    addArrayToDb(repairs, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("repair", repairs.length);

    //building_repairs
    const building_repairs = getManyToManyRecordsInternal(repairsPerBuilding, buildings, repairs, getBuildingRepairItem);
    addArrayToDb(building_repairs, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("building_repair", building_repairs.length);

    //customer_contract_buildings
    const customer_contract_buildings = getManyToManyRecordsInternal(contractsPerBuilding, customerContracts, buildings, getCustomerContractBuildingItem);
    addArrayToDb(customer_contract_buildings, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("customer_contract_building", customer_contract_buildings.length);

    //paf_buildings
    const paf_buildings = getManyToManyRecordsInternal(pafsPerBuilding, pafs, buildings, getPafBuildingItem);
    addArrayToDb(paf_buildings, dynamoDbTableName, insertItem, insertDelay);
    dataCollections.set("paf_building", paf_buildings.length);

    console.log("Item counts");
    console.log(dataCollections);
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

function getCustomerContracts(idSeedStart : number, childPerParent: number, customers: Customer[]) {
    return getChildMultiRecordsInternal(idSeedStart, childPerParent, customers, getNewCustomerContractItems);
}

function getSupplierContracts(idSeedStart : number, childPerParent: number, suppliers: Supplier[]) {
    return getChildMultiRecordsInternal(idSeedStart, childPerParent, suppliers, getNewSupplierContractItems);
}

function getBuildingEntrances(idSeedStart : number, childPerParent: number, buildings: Building[]) {
    return getChildMultiRecordsInternal(idSeedStart, childPerParent, buildings, getNewBuildingEntranceItems);
}

function getPodInspections(idSeedStart : number, childPerParent: number, pods: Pod[], supplierContracts: SupplierContract[]) {

    const childRecords = new Array<PodInspection>();

    pods.forEach((p, index)=> {
        const supplierContract = oneOf(supplierContracts);
        const children = getNewPodInspectionItems(idSeedStart + index * childPerParent, p, supplierContract, childPerParent);
        children.forEach(c=>childRecords.push(c));
    });

    return childRecords;
}

function getPodMaintenances(idSeedStart : number,childPerParent: number, pods: Pod[], supplierContracts: SupplierContract[]) {

    const childRecords = new Array<PodMaintenance>();

    pods.forEach((p, index)=> {
        const supplierContract = oneOf(supplierContracts);
        const children = getNewPodMaintenanceItems(idSeedStart + index * childPerParent, p, supplierContract, childPerParent);
        children.forEach(c=>childRecords.push(c));
    });

    return childRecords;
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

function getChildMultiRecordsInternal<T1, T2>(
    idSeedStart : number, 
    childPerParent: number,
    parents: T1[], 
    createChildrenInternalFunc: (index: number, parent: T1, childPerParent: number) => T2[]): T2[] {
        if(parents.length == 0) {
            return [];
        }

        const childRecords = new Array<T2>();

        parents.forEach((p, index)=> {
            const children = createChildrenInternalFunc(idSeedStart + index * childPerParent, p, childPerParent);
            children.forEach(c=>childRecords.push(c));
        });

    return childRecords;
}

function createInvoices(invoiceIdSeedStart: number, invoicesCount: number, pods: Pod[], suppliers: Supplier[]){

    const arr = [];
    for(let i = invoiceIdSeedStart; i < invoiceIdSeedStart + invoicesCount; i++){
        arr.push(getNewInvoiceItem(i, oneOf(pods), oneOf(suppliers)));
    }

    return arr;
}

function getManyToManyRecordsInternal<T1, T2, T3>(
    childPerParent: number,
    parents1: T1[], 
    parents2: T2[],
    createChildrenInternalFunc: (parent1: T1, parent2: T2) => T3): T3[] {
        if(parents1.length === 0 || parents2.length === 0) {
            return [];
        }

        const childRecords = new Array<T3>();

        parents1.forEach((parent1)=> {
            for(let i = 0; i < childPerParent; i++){
                const parent2 = oneOf(parents2);
                const child = createChildrenInternalFunc(parent1, parent2);
                childRecords.push(child);
            }
        });

    return childRecords;
}