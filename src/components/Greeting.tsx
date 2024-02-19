import {useState, useReducer} from 'react'
import axios, {AxiosResponse} from 'axios'

interface FetchProps {
    url: string
}

export interface GreetingResponse {
    greeting: string
}

interface GreetingReducerAction {
    type: 'SUCCESS' | 'ERROR'
    greeting?: string
    error?: never
}

class GreetingState {
    greeting: string
    isError: boolean

    constructor(
        greeting: string = "",
        isError: boolean = false
    ) {
        this.greeting = greeting;
        this.isError = isError;
    }
}

function greetingReducer(
    state: GreetingState,
    action: GreetingReducerAction
): GreetingState {
    switch (action.type) {
        case 'SUCCESS': {
            return {
                isError: false,
                greeting: action.greeting ?? '',
            }
        }
        case 'ERROR': {
            console.log("error while fetching greeting: " + action.error)
            return {
                isError: true,
                greeting: "",
            }
        }
        default: {
            return state
        }
    }
}

export default function Greeting({url}: FetchProps) {
    const [{isError, greeting}, dispatch] = useReducer(
        greetingReducer,
        new GreetingState(),
    )
    const [buttonClicked, setButtonClicked] = useState(false)

    const fetchGreeting = async (url: string) => {
        setButtonClicked(true);
        axios
            .get(url)
            .then((response: AxiosResponse<GreetingResponse>) => {
                const {data} = response
                const {greeting} = data
                dispatch({type: 'SUCCESS', greeting: greeting})
            })
            .catch((error?: never) => {
                dispatch({type: 'ERROR', error: error})
            })
            .finally(() => {
                setButtonClicked(false);
            })
    }

    const buttonText: string = buttonClicked ? 'Ok' : 'Load Greeting'

    return (
        <div>
            <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
                {buttonText}
            </button>
            {greeting && <h2>{greeting}</h2>}
            {isError && <p role="alert">Oops, failed to fetch!</p>}
        </div>
    )
}
