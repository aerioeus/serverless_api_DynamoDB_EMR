import moment from "moment";
import { ItemBase } from "../models/base";
import uuid = require("uuid");

export function getRandom(value: number){
    return Math.round(value * Math.random());
}

export function oneOf <T>(items: T[]){
    const index = getRandom(items.length - 1);
    return items[index];
}

export function getRandomDate(yearBase: number, yearIncr: number){
    return `${zeroPad(1 + getRandom(11), 2)}/${zeroPad(1 + getRandom(27), 2)}/${yearBase +  getRandom(yearIncr)}`;
}

export function zeroPad(value: number, size: number){
    var s = String(value);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

export function getCurrentDateTimeLikeAws(){
    return moment(new Date()).format('MMM/DD/YYYY:hh:mm:ss +0000');
}

export function getRandomFloat(value: number){
    return +(value * Math.random()).toFixed(2);
}

/**
 * Creates a collection of items
 * @param idSeedStart - starting entity_id
 * @param elemCount - collection size
 * @param createItem - function for creating one item
 */
export function createItems<T>(idSeedStart: number, elemCount: number, createItem: (index:number) => T): T[] {
    if(! createItem) {
        return [];
    }

    const arr = [];
    for(let i = idSeedStart; i < idSeedStart + elemCount; i++){
        arr.push(createItem(i));
    }

    return arr;
}

/**
 * Returns array of 1 - randomCount random items 
 * @param items - collection to take items from
 * @param randomCount - max size of array to return
 * @param stepsLimit - max count of steps we can make to find a random item not present in the final array
 */
export function fewTimesOneOf<T extends ItemBase>(items: T[], randomCount: number, stepsLimit: number) : T[] {
    const result = new Array<T>();

    for(let index = 0; index < randomCount; index++) {

        for(let step = 0; step < stepsLimit; step ++) {
            const item = oneOf(items);
            if (result.every(i => i.item_id !== item.item_id)) {
                result.push(item);
            }
        }
    }

    return result;
}

export function getNewGuid(){
    return `${uuid.v4().toString()}-fake`;
}