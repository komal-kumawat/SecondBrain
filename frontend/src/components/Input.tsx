export function Input({onChange , placeholder , value}:{onChange:(event: React.ChangeEvent<HTMLInputElement>) => void, placeholder:string , value?:string}){
    return <div>
        <input type="text" placeholder={placeholder} onChange={onChange} value={value} className="px-4 py-2 border rounded  m-2 "/>
    </div>
}