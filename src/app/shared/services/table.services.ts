import {userStatus} from '../../../app/core/enum/userStatus.enum';
import {Injectable} from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


@Injectable()

export class TableService {
  constructor(private http:HttpClient) {}

  getEvents() {
    return EXAMPLE_DATA
  }
}

export interface TableItem {
    name: string;
    email: string;
    status: string;
  }



const EXAMPLE_DATA: TableItem[] = [
    {
      name: "Calvin Rittmeyer",
      email: "crittmeyer0@zimbio.com",
      status: userStatus[1],
    },
  
    {
      name: "Madelene Pellew",
      email: "mpellew1@gmail.my",
      status: userStatus[0],
    },
  
    {
      name: "Heinrick Wedgwood",
      email: "hwedgwood9@discovery.com",
      status: userStatus[1],
    },
  
    {
      name: "Alfy Valder",
      email: "avalder8@typepad.com",
      status: userStatus[1],
    },
  
    {
      name: "Theodore Cawthery",
      email: "tcawthery2@cornell.edu",
      status: userStatus[1],
    },
    {
      name: "Prent",
      email: "pmilstead1@scribd.com",
      status: userStatus[0],
    },
  
    {
      name: "Helaina",
      email: "htuck3@barnesandnoble.com",
      status: userStatus[0],
    }
  ];

export class TableDataSource extends DataSource<TableItem> {
data: TableItem[] = EXAMPLE_DATA;
paginator: MatPaginator;
sort: MatSort;

constructor() {
    super();
}

/**
 * Connect this data source to the table. The table will only update when
 * the returned stream emits new items.
 * @returns A stream of the items to be rendered.
 */
connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
    observableOf(this.data),
    this.paginator.page,
    this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
    return this.getPagedData(this.getSortedData([...this.data]));
    }));
}

/**
 *  Called when the table is being destroyed. Use this function, to clean up
 * any open connections or free any held resources that were set up during connect.
 */
disconnect() {}

/**
 * Paginate the data (client-side). If you're using server-side pagination,
 * this would be replaced by requesting the appropriate data from the server.
 */
private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
}

/**
 * Sort the data (client-side). If you're using server-side sorting,
 * this would be replaced by requesting the appropriate data from the server.
 */
private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
    return data;
    }

    return data.sort((a, b) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.email, +b.email, isAsc);
        default: return 0;
    }
    });
}
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}