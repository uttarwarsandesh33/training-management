import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: 'Can not contain space' }
        }
        return null;
    }

    static cannotStartWithSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') == 0) {
            return { cannotStartWithSpace: 'Can not start with space' }
        }
        return null;
    }


    static checkAge(control: AbstractControl): ValidationErrors | null {
        let date = control.value;
        let ageDifMs = Date.now() - new Date(date).getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 18) {
            return { checkAge: 'Age is below 18' }
        } else if (age > 60) {
            return { checkAge: 'Age is greater than 60' }
        }
        return null;
    }

    /**
     * 
     * @param date should be in format yyyy-mm-dd
     */
    static dateConverter(date){
        let dateArr = date.split('-');
        return dateArr[1]+'/'+dateArr[2]+'/'+dateArr[0];
    }
}