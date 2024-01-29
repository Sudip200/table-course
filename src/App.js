import logo from './logo.svg';
import './App.css';
import './index.css';
import { QueryClient,QueryClientProvider,useQuery } from 'react-query'
import CoursesPage from './pages/CoursePage';
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <CoursesPage/>
    </QueryClientProvider>
  );
}

export default App;
