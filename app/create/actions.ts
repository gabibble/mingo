"use server";

import { randomInt } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase-admin"

function generateGameKey(): string {
    // Generate 5 digit game key
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
    

    let gameId : string | undefined;
    for (let attempt = 1; attempt <= 5; attempt++) { // Try 5 times to generate a unique game key
        const gameKey = generateGameKey();
        console.log(gameKey);

        // Send gameKey and title to supabase
        const { data, error } = await supabaseAdmin.from("game").insert({ title, game_key: gameKey }).select("id").single();

        if (data) {
            console.log(data)
            gameId = data.id;
            break;
        }

        // Duplicate error imdicates gameKey is not unique, try again 
        if (error?.code === '23505') continue;

        if (error) {
            console.error(error.message, error.code);
            throw new Error("Couldn't create the game");
        }

    }

    if (!gameId) throw new Error("Couldn't find a free key");



};
