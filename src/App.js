
import './App.css';
import './index.css';
import { QueryClient,QueryClientProvider } from 'react-query'
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
