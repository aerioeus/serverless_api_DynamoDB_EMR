import { Pod } from "../../models";
import { getCurrentDateTimeLikeAws, getRandomFloat, getRandom, getNewGuid, getRandomDate } from "../factory.utils";
import { Invoice } from "../../models/invoice/invoice.interface";
import { Supplier } from "../../models/supplier/supplier.interface";

    /**
     ItemBase overrides

    pk_id       = { invoice_id }
    sk          = { pod_id }
    gsi_1_sk    = { invoice_due_date }

    gsi_2_pk:   = { invoice_id }
    gsi_2_sk:   = { invoice_supplier_id }
    gsi_3_pk:   = { invoice_supplier_id }
    gsi_3_sk:   = { invoice_supplier_id }
    */

export function getNewInvoiceItem(index:any, pod: Pod, supplier: Supplier): Invoice {

    const invoice_id = `Invoice-${index}`;
    const date = getRandomDate(2018, 1);

    const item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: invoice_id,
        sk: pod.pod_id,
        gsi_1_sk: date,

        gsi_2_pk: invoice_id,
        gsi_2_sk: supplier.supplier_id,
        gsi_3_pk: supplier.supplier_id,
        gsi_3_sk: supplier.supplier_id,

        item_type_debug: "invoice",

        invoice_id: invoice_id,
        invoice_supplier_id: supplier.supplier_id,
        invoice_ref_number: getRandom(256).toString(),
        invoice_contractor: supplier.supplier_name,
        invoice_amount: getRandomFloat(3000),
        invoice_description: `Description for invoice #${invoice_id}`,
        invoice_positions: getRandom(10),
        invoice_due_date: date,
        invoice_reference_number: `R-66${index}`
    };

    return item;
}