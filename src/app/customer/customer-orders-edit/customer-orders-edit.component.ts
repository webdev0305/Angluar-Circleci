import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../../core/services/data.service';
import { ModalService, IModalContent } from '../../core/modal/modal.service';
import { IOrder, ICustomer, IProduct } from '../../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../../core/growler/growler.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'cm-orders-edit',
  templateUrl: './customer-orders-edit.component.html',
  styleUrls: ['./customer-orders-edit.component.css']
})
export class CustomerOrdersEditComponent implements OnInit {

  customer: ICustomer = 
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      },
      orders: [],
      orderTotal: 0,
      latitude: 0,
      longitude: 0      
    };    
  errorMessage: string;
  deleteMessageEnabled: boolean;
  deleteItemMessageEnabled: boolean[] = [];
  items: IProduct[] = [];
  operationText = 'Insert';
  @ViewChild('orderForm') orderForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService) { }

  ngOnInit() {
      // Subscribe to params so if it changes we pick it up.  Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        const id = +params['id'];
        this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
          this.customer = customer;
          if(this.customer.orders && this.customer.orders.length > 0) {
            this.operationText = 'Update';
            for(let i = 0; i < this.customer.orders.length; i++)
              this.deleteItemMessageEnabled[i] = false;
          } else {
            this.customer.orders = [];            
          }
        });
      });

      this.dataService.getItems().subscribe((items: IProduct[]) => this.items = items);      
  }

  submit() {
    // Add your code here
  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/customer-orders']);
  }

  delete() {
    // Add your code here
  }

  addItem() {
    // Add your code here
  }

  deleteItem(i) {
    // Add your code here
  }

  hasOrdersCount() {
    var hasCount = false;
    if (this.customer.orders && this.customer.orders.length > 0)
      hasCount = true;
    return hasCount;
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.orderForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  }

}
