import { Board } from '../interfaces'

export const boardData: Board[] = [
  {
    id: 1,
    name: '📝 Backlog',
    tasks: [
      {
        id: 1,
        position: 1,
        name: '[481] - [Markup] Create Project Board Task Component',
        assignee: {
          id: 1,
          name: 'Joshua Galit',
          avatar: {
            url: 'https://app.asana.com/0/1203011167276287/1203120093553479',
            filename: 'icon.png'
          }
        },
        is_completed: false,
        due_date: '10/19/22',
        estimated_time: '4',
        actual_time_finished: '6'
      },
      {
        id: 2,
        position: 2,
        name: '[479] - [Markup] Create Project Board Section Component',
        assignee: {
          id: 2,
          name: 'Joshua Galit',
          avatar: {
            url: 'https://app.asana.com/0/1203011167276287/1203120093553479',
            filename: 'icon.png'
          }
        },
        is_completed: false,
        due_date: '10/19/22',
        estimated_time: '4',
        actual_time_finished: '6'
      }
    ]
  },
  {
    id: 2,
    name: '🕞 In Progress'
  },
  {
    id: 3,
    name: '🧑‍💻 Code Review'
  },
  {
    id: 4,
    name: '✅ Completed'
  }
]
