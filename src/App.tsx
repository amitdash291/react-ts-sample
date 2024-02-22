import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MessageWithChildren from "./components/MessageWithChildren.tsx";
import {LinkedLogo} from "./components/LinkedLogo.tsx";
// import {CourseTable} from "./components/CourseTable.tsx";
import {SortableCourseTable} from "./components/SortableCourseTable.tsx";
import {coursesMockData} from "./mocks/courses.ts";

function App() {
    return (
        <div style={{flex: 1}}>
            <div style={{flex: 1}}>
                <LinkedLogo
                    linkUrl="https://vitejs.dev"
                    image={{
                        src: viteLogo,
                        alt: "Vite logo"
                    }}
                />
                <LinkedLogo
                    linkUrl="https://react.dev"
                    image={{
                        src: reactLogo,
                        alt: "React logo"
                    }}
                />
                <MessageWithChildren name="John Doe">
                    <p> Welcome to the app!</p>
                </MessageWithChildren>
            </div>
            <div>
                {/*<CourseTable courses={coursesMockData}/>*/}
                <SortableCourseTable courses={coursesMockData} getSortValue={(course) => course.name}/>
            </div>
        </div>
    )
}

export default App
