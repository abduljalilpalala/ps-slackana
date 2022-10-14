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
            url: 'https://ca.slack-edge.com/E028JVBUY4F-U03N1UNTGAY-5ef1b06f109b-512',
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
            url: 'https://ca.slack-edge.com/E028JVBUY4F-U03N1UNTGAY-5ef1b06f109b-512',
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
    name: '🕞 In Progress',
    tasks: [
      {
        id: 3,
        position: 3,
        name: '[23]-[BE] Create Project Members API',
        assignee: {
          id: 3,
          name: 'Abdul Jalil Palala',
          avatar: {
            url: 'https://ca.slack-edge.com/E028JVBUY4F-U03N2F2SHV2-39c1dcf42b67-512',
            filename: 'icon.png'
          }
        },
        is_completed: false,
        due_date: '10/19/22',
        estimated_time: '4',
        actual_time_finished: '6'
      },
      {
        id: 4,
        position: 4,
        name: '[42]-[BE] Implement Edit Project Functionality',
        assignee: {
          id: 4,
          name: 'Abdul Jalil Palala',
          avatar: {
            url: 'https://ca.slack-edge.com/E028JVBUY4F-U03N2F2SHV2-39c1dcf42b67-512',
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
    id: 3,
    name: '🧑‍💻 Code Review',
    tasks: [
      {
        id: 6,
        position: 6,
        name: '[37]-[FE] Integrate Set Status Functionality',
        assignee: {
          id: 6,
          name: 'John Paul Banera',
          avatar: {
            url: 'https://ca.slack-edge.com/E028JVBUY4F-U03DUBE2G9W-974bff0bc22c-512',
            filename: 'icon.png'
          }
        },
        is_completed: false,
        due_date: '10/19/22',
        estimated_time: '4',
        actual_time_finished: '6'
      },
      {
        id: 7,
        position: 7,
        name: '[20]-[FE] Integrate Create Project Functionality',
        assignee: {
          id: 7,
          name: 'John Paul Banera',
          avatar: {
            url: 'https://ca.slack-edge.com/E028JVBUY4F-U03DUBE2G9W-974bff0bc22c-512',
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
    id: 4,
    name: '✅ Completed'
  }
]
