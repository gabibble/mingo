"use server";

import { randomInt } from "node:crypto";

function generateGameKey(): string {
    return randomInt(0, 100000).toString().padStart(5, "0");
}

export async function createGame(formData: FormData) {

    const title = String(formData.get('title')  ?? '').trim();
    if (!title) throw new Error("Please add a title");


    const terms = String(formData.get('terms')  ?? '')
        .split('\n')
        .map(term => term.trim())
        .filter(Boolean);

    const termNumber = 25

    if (terms.length !== termNumber) throw new Error(`There must be ${termNumber} terms`);
    
    const gameKey = generateGameKey();
    console.log(gameKey);

    console.log(title,terms)
    return terms;

};
