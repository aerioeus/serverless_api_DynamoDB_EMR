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
import { PriceAdjustmentFormula, CustomerContract, Customer } from "./models";
import { CustomerContractInternal } from "./models/internal/customer-contract.internal.interface";
import { ItemBase } from "./models/base";
import { Supplier } from "./models/supplier.interface";
import { getNewSupplierContractItem } from "./fake-factories/supplier-contract.factory";
import { SupplierContractInternal } from "./models/internal/supplier-contract.internal.interface";
import { getNewSupplierItem } from "./fake-factories/supplier.factory";

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
    
    const customerIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const customerCount = +(elemCount / contractsPerCustomer).toFixed();

    const pafIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const pafsCount = +(2 * elemCount / contractsPerPaf).toFixed();

    // create customers
    const customers = createItems(customerIdSeedStart, customerCount, getNewCustomerItem);

    // create customer contracts
    const customerContracts = getCustomersAndContracts(idSeedStart, elemCount, customers);
    addArrayToDb(customerContracts, dynamoDbTableName, insertCutomerContract, insertDelay);

    // create customer pafs
    const pafs = createItems(pafIdSeedStart, pafsCount, getNewPafItem);
    addArrayToDb(pafs, dynamoDbTableName, insertItem, insertDelay);

    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelationsCustomers = getPafContractLists(pafs, customerContracts, contractsPerPaf);

    // create pafContracts for customers
    const contractPafsCustomers = pafContractRelationsCustomers.map(i=> getContractPafItem(i.paf, i.contract, false));
    addArrayToDb(contractPafsCustomers, dynamoDbTableName, insertItem, insertDelay);

    // create contractPafs for customers
    const pafContractsCustomers = pafContractRelationsCustomers.map(i=>getPafContractItem(i.contract, i.paf, false));
    addArrayToDb(pafContractsCustomers, dynamoDbTableName, insertItem, insertDelay);
    
    // create suppliers
    const suppliers = createItems(customerIdSeedStart, customerCount, getNewSupplierItem);

    // create supplier contracts
    const supplierContracts = getSuppliersAndContracts(idSeedStart, elemCount, suppliers);
    addArrayToDb(supplierContracts, dynamoDbTableName, insertSupplierContract, insertDelay);

    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelationsSuppliers = getPafContractLists(pafs, customerContracts, contractsPerPaf);

    // create pafContracts for customers
    const contractPafsSuppliers = pafContractRelationsSuppliers.map(i=> getContractPafItem(i.paf, i.contract, true));
    addArrayToDb(contractPafsSuppliers, dynamoDbTableName, insertItem, insertDelay);

    // create contractPafs for customers
    const pafContractsSuppliers = pafContractRelationsSuppliers.map(i=>getPafContractItem(i.contract, i.paf, true));
    addArrayToDb(pafContractsSuppliers, dynamoDbTableName, insertItem, insertDelay);
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
 * Function for inserting customers and customer_contracts into the DB
 * @param item 
 */
const insertCutomerContract = (item: CustomerContractInternal, dynamoDbTableName: string) => {
    addItemToDb(item.db_item, dynamoDbTableName, dynamoDoc);
    addItemToDb(item.customer_db_item, dynamoDbTableName, dynamoDoc);
}

const insertSupplierContract = (item: SupplierContractInternal, dynamoDbTableName: string) => {
    addItemToDb(item.db_item, dynamoDbTableName, dynamoDoc);
    addItemToDb(item.supplier_db_item, dynamoDbTableName, dynamoDoc);
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

function getCustomersAndContracts(idSeedStart : number, elemCount: number, customers: Customer[]) {
    // create customer_contracts and customers
    const customerContracts = [];

    for (let i = idSeedStart; i < idSeedStart + elemCount; i++){
        const contract = getNewCustomerContractItem(i++, oneOf(customers));
        customerContracts.push(contract);
    }

    return customerContracts;
}

function getSuppliersAndContracts(idSeedStart : number, elemCount: number, suppliers: Supplier[]) {
    // create customer_contracts and customers
    const customerContracts = [];

    for (let i = idSeedStart; i < idSeedStart + elemCount; i++){
        const contract = getNewSupplierContractItem(i++, oneOf(suppliers));
        customerContracts.push(contract);
    }

    return customerContracts;
}

function getPafContractLists(pafs: PriceAdjustmentFormula[], customerContracts: CustomerContractInternal[], contractsPerPaf: number) {
    // create adjucency list to implement many-to-many between pafs and contracts
    const pafContractRelations: { paf: PriceAdjustmentFormula; contract: CustomerContract }[] = [];

    for (let i = 0; i < pafs.length; i++) {
        // assign random contracts to each paf
        const thisPafContracts = fewTimesOneOf(customerContracts.map(i=>i.db_item), contractsPerPaf, 10);

        thisPafContracts.forEach((c) => {
            pafContractRelations.push({
                paf: pafs[i],
                contract: c
            });
        });
    }

    return pafContractRelations;
}