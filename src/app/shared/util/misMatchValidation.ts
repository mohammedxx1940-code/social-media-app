import {AbstractControl} from "@angular/forms";
export function misMatchValidation(fControlName : string , sControlName : string , 
    controllerToError ?: string){
        return (group:AbstractControl) => {
            const valueFController = group.get(fControlName)?.value;
            const valueSController = group.get(sControlName)?.value;
            if(valueFController !== valueSController){
                group.get(controllerToError || fControlName)?.setErrors({
                    mismatch : true , 
                    [fControlName] : valueFController ,
                    [sControlName] : valueSController
                })
                return {
                    mismatch : true ,
                    [fControlName] : valueFController ,
                    [sControlName] : valueSController
                };
            }else{
                return null
            }
        }
}