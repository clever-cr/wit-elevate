import {searchProps} from "../../util/types"
import Button from "./Button"

const Search =({placeholder,text}: searchProps)=>{
return(
    
     <div className="flex gap-8 ">
        <input
          placeholder={placeholder}
          className="bg-bright py-5 px-4 rounded-md w-[650px]"
        />
        <Button text={text} className="bg-secondary text-white" />
      </div>
    
)
}
export default Search