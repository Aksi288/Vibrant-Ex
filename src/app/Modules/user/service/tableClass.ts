
import {  BehaviorSubject, of } from "rxjs";
import { ApiService } from 'src/app/core/services/api.service';
import { MatPaginator } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { InjectorInstance } from 'src/app/app.module';


export class UserService {


  public data = new BehaviorSubject<any>([]);

  public totalData$ = new BehaviorSubject<number>(0);


  private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    private pageIndex: number = 1;
  
    private pageSize: number = 6;

    public apiUrl: string = "";

    httpClient = InjectorInstance.get<ApiService>(ApiService);

  constructor( 
    private apiURL: string,
    private paginator: MatPaginator
    ) {
      this.apiUrl = apiURL;
      this.whenPaginationChanges();
     }


  /** When Pagination Changes we have already subscribed to the MatPaginator  */
  whenPaginationChanges(): void {
    this.paginator.page.subscribe((data) => {
      this.pageIndex = data.pageIndex + 1 ;
      this.pageSize = data.pageSize ;
      this.loadListData();
    });
  }

     whenDeleteData(): void {
      this.paginator.pageIndex = 0;
      this.pageIndex = 1;
      this.loadListData();
    }
  

  loadListData(): void {
    this.loadingSubject.next(true);
    this.data.next([]);
    this.httpClient.get(
            `${this.apiUrl}page=${this.pageIndex}`
          )
          .pipe(
            finalize(() => {
              this.loadingSubject.next(false);
            })
          )
          .subscribe(
            (response) => {
              this.totalData$.next(response.total);
              this.data.next(response.data);
            },
            (error) => of([])
          );
  }



 


}
