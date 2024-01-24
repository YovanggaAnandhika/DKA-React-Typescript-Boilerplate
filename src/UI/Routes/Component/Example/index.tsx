// @ts-ignore
import React, {Suspense, useContext, useEffect, useState} from "react";

function Example() {

    const [ IsMounted, setIsMounted ] = useState(false);
    const [ExampleVal, setExampleVal] = useState("");

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    },[]);

    useEffect(() => {
        if (IsMounted){
            // @ts-ignore
            window.api.send("WINDOW_MOUNT", { name : Example.name});

            // @ts-ignore
            window.api.on("EXAMPLE", (events, args) => {
                setExampleVal(JSON.stringify(args));
            })
        }
        return () => {
            // @ts-ignore
            window.api.send("WINDOW_UNMOUNT", { name : Example.name})
        }
    },[IsMounted])

    return (
        <>
            <h1>{ExampleVal} </h1>
        </>
    )
}

export default Example;