import React, { useState, useCallback, useEffect, useRef } from 'react';

const Test = () => {
    const [text, setText] = useState('')
    const [values, setValue] = useState<string[]>([])
    const onChange = useCallback((e: any) => { setText(e.target.value) }, [])

    const onSubmit = (e: any) => {
        e.preventDefault()
        setValue([...values, text])

    }
    useEffect(() => {
        return () => {
            setText('')
        }
    }, [values])
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="" id="" value={text} onChange={onChange} />
                <button type="submit" >입력</button>
            </form>
            {values.map(value => <div key={value}>{value}</div>)}
        </div>
    );
};

export default Test;