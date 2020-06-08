import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IOrder, IState, IPagedResults, IApiResponse, IProduct } from '../../shared/interfaces';

@Injectable()
export class DataService {

    // Can use /api/customers and /api/orders below when running locally
    // Full domain/port is included for Docker example or if it were to run in the cloud
    port = '8080';
    baseUrl = `http://localhost:${this.port}`; //`${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;
    customersBaseUrl = this.baseUrl + '/api/customers';
    ordersBaseUrl = this.baseUrl + '/api/orders';
    orders: IOrder[];
    states: IState[];

    constructor(private http: HttpClient) { 

    }

    getCustomersPage(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
        // Add your code here        
        return null;
    }

    getCustomers(): Observable<ICustomer[]> {
        // Add your code here        
        return null;
    }

    getCustomer(id: number): Observable<ICustomer> {
        // Add your code here        
        return null;
    }

    insertCustomer(customer: ICustomer): Observable<ICustomer> {
        // Add your code here        
        return null;
    }

    updateCustomer(customer: ICustomer): Observable<boolean> {
        // Add your code here
        return null        
    }

    deleteCustomer(id: number): Observable<boolean> {
        // Add your code here        
        return null;
    }

    getStates(): Observable<IState[]> {
        // Add your code here
        return null        
    }

    getItems(): Observable<IProduct[]> {
        // Add your code here
        return null        
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (const customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (const order of customer.orders) {
                    total += order.itemCost;
                }
                customer.orderTotal = total;
            }
        }
    }

    // Not using now but leaving since they show how to create
    // and work with custom observables

    // Would need following import added:
    // import { Observer } from 'rxjs';

    // createObservable(data: any): Observable<any> {
    //     return Observable.create((observer: Observer<any>) => {
    //         observer.next(data);
    //         observer.complete();
    //     });
    // }

}
