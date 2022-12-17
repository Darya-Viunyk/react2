import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handleSubmit = data => {
    this.addTodo(data);
  };

  addTodo = text => {
    const toDo = {
      id: nanoid(),
      text: text,
    };
    this.setState(({ todos }) => ({
      todos: [...todos, toDo],
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {todos.length > 0 &&
            todos.map(todo => (
              <GridItem key={todo.id}>
                <Todo id={todo.id} text={todo.text} />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}
