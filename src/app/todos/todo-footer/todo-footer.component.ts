import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filter/filter.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  actualFilter: actions.validFilters = 'all';
  filters: actions.validFilters[] = ['all', 'completed', 'pending'];
  pending: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // this.store
    //   .select('filter')
    //   .subscribe((filter) => (this.actualFilter = filter));

    this.store.subscribe(state => {
      this.actualFilter = state.filter;
      this.pending = state.todos.filter(todo => !todo.completed).length
    })
  }

  changeFilter(filter: actions.validFilters) {
    this.store.dispatch(actions.setFilter({ filter }));
  }
}
