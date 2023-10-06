import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
// import datatable from  '../../assets/translate/core/en.json'
declare var $:any
export class Test {
  constructor(
    public sr: string,
    public eId: string,
    public crNumber:string,
    public customCode:string,
    public agencyName:string,
    public status:string,
    public creationDate:string,
    public clearingAgencyType:string
  ) { }
}
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  myDateValue!: Date;
  customCodeTable!:string;
  crnumberTable!:string;
  clients = Array<Test>();
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  showRightToLeft:boolean=false
  items = [];
  crNumber!: string;
  agencyName!: string;
  customCode!:string;
  username!: string;
  creationDate!:string
password!:string;
establishmentId!:string
creationDateTo!:string
maxDate = new Date();
minDate = new Date();
  constructor(public translate: TranslateService){ // inject the Pipe) { 
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();

    try {
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
      console.log('browserLang',browserLang)
    } catch (error) {
      console.log(error);
    }
    // this.userForm =this._formBuilder.group({
    //   crNumber:['',[Validators.required]],
    //   agencyName:['',[Validators.required]],
    //   customCode:['',[Validators.required]],
    //   creationDateForm:['',Validators.required],
    //   creationAgencyType:['',[Validators]],
    //   status:['',[Validators.required]],
    //   establishmentId:['',Validators.required],
    //   creationDateTo:['',Validators.required]
    // })
  }
  
  selecteLang(event:any){
    console.log(event.target.value)
    if(event.target.value=='ar'){
      this.showRightToLeft =true;
    }
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.myDateValue = new Date();

    this.dtOptions = {
      order: [[0, "asc"]],
      autoWidth: true,
      columns: [
        { title: 'Code', data: 'name' },
        { title: 'Name', data: 'code' },
      ]
    };

    this.clients.push(new Test("1","12356784","","L2775","newnm2","Pending Approval", "27/08/2023","Goverment"));
    this.clients.push(new Test("2","34555558","","L2774","angular fZc","Rejected", "27/08/2023","Private"));
    this.clients.push(new Test("3","32321324","","L2770","non gov","Pending Approval", "25/08/2023","Private"));
    this.clients.push(new Test("4","97876532","","L2779","new ncm legancy","Pending Approval", "24/08/2023","Goverment"));
    this.translate.get(['datatable.record1.crnumber', 'datatable.record1.customCode'])
    .subscribe(translations => {
      this.crnumberTable = translations['datatable.record1.crnumber'];
      this.customCodeTable = translations['datatable.record1.customCode'];
      console.log(this.crnumberTable,'this.crnumberTable')
    });
    
    this.rerender();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
  }
  datimepicker(){
    $('#datetimepicker1').datetimepicker();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;

        // For checked fields
        // $('input[type=checkbox]', this.footer()).on('checked change', function () {
        //   if (this['value'] === 'true') {
        //     that.search(this['value']).draw();
        //   } else {
        //     that.search('').draw();
        //   }
        // });

        // $('input[type=text]', this.footer()).on('keyup change', function () {
        //   console.log("text : " + this['value']);
        //   if (that.search() !== this['value']) {
        //     that.search(this['value']).draw();
        //   }
        // });
      });
    });
  }
}

//


 


