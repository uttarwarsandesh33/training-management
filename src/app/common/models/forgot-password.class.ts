export class ForgotPassword {
    email: string;
    password: string;
    question:string;
    answer:string;
    qa: QA = new QA();
    dob: any =  null;

  }



class QA {
    firstCompany?: any;
    maidensName?: any;
  }