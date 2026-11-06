"use server";

export async function createGame(formData: FormData) {

    const title = String(formData.get('title')  ?? '').trim();
    if (!title) throw new Error("Please add a title");


    const terms = String(formData.get('terms')  ?? '')
        .split('\n')
        .map(term => term.trim())
        .filter(Boolean);

    const termNumber = 25

    if (terms.length !== termNumber) throw new Error(`There must be ${termNumber} terms`);
    
    console.log(title,terms)
    return terms;

};