import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MessageWithChildren from "./components/MessageWithChildren.tsx";
import {LinkedLogo} from "./components/LinkedLogo.tsx";

function App() {

    return (
        <>
            <div>
                <LinkedLogo
                    linkUrl="https://vitejs.dev"
                    imageSrc={viteLogo}
                    imageAlt="Vite logo"
                />
                <LinkedLogo
                    linkUrl="https://react.dev"
                    imageSrc={reactLogo}
                    imageAlt="React logo"
                />
                <MessageWithChildren name="Amit">
                    <p> Welcome to the app!</p>
                </MessageWithChildren>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </>
    )
}

export default App
