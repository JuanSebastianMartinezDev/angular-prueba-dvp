import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    @Input() message = "";
    @Input() title = "";

    myForm = new FormGroup({});
  	constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    	this.createForm();
   	}

   	ngOnInit() {

   	}

    createForm() {
     	this.myForm = this.formBuilder.group({});
    }

    closeForm() {
     	this.activeModal.close();
    }

}
