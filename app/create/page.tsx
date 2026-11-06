import { createGame } from "./actions";

export default function CreateGame() {
    return (
        <form action={createGame}>
            <div>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" />
            </div>
            <div>
                <label htmlFor="terms">Terms</label>
                <textarea id="terms" name="terms"></textarea>
            </div>
            <button>Submit</button>
        </form>

    )
}
