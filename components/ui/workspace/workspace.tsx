"use client"
import Split from "react-split";
import ProblemDescription from "@/components/ui/workspace/problemDescription/problemDescription";

const Workspace = () => {
    return (
        <div>
            <Split className={'split'} minSize={0}>
                <ProblemDescription/>
                <div>Code</div>
            </Split>
        </div>
    );
};


export default Workspace;