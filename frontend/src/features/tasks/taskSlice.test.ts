import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from 'app/store'; // Adjust the import to your project structure
import { getTasks } from './taskSlice'; // Import your thunk action
import taskService from './taskService';
import configureMockStore from 'redux-mock-store';

type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>;

// Create the mock store with thunk middleware
const middleware = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middleware);

describe('taskSlice', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        tasks: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      },
      auth: {
        user: {
          token: 'mock_token',
          name: 'Mock User',
          email: 'mockuser@example.com',
          password: 'mockpassword',
        },
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: 'Mock message.',
      },
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  test('calls the taskService to fetch tasks', async () => {
    const token = 'mock_token';
    const tasks = [
      {
        _id: '649e4e271947362dc297436a',
        text: 'Learn Tailwind',
        user: '649023b41935f5557f8e7ca4',
        createdAt: '2023-06-30T03:38:15.287Z',
        updatedAt: '2023-06-30T03:38:15.287Z',
        __v: 0,
      },
    ];

    // Mock the taskService.getTasks method
    const getTasksSpy = jest.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);

    await store.dispatch(getTasks());

    expect(getTasksSpy).toHaveBeenCalledWith(token);
  });
});
