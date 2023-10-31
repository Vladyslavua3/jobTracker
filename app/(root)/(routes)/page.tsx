import {UserButton} from "@clerk/nextjs";

const SetupPage = () => {



    return <div>
        <div>Hello</div>
        <UserButton afterSignOutUrl="/"/>
    </div>
}


export default SetupPage