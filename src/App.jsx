import Table  from './components/Table';
// import FilteringExample from './components/GlobalFiltering';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {

  function editFunction(){
    alert('editFunction');
  };


  function createFunction(){
    alert('createFunction');
  };


  function deleteFunction(){
    alert('deleteFunction');
  };


  function getFunction(){
    alert('getFunction');
  };
  
const queryClient = new QueryClient();
  return(
    <>
  <QueryClientProvider client={queryClient}>
    <Table editFunction={editFunction} createFunction={createFunction} deleteFunction={deleteFunction} getFunction={getFunction} />
  </QueryClientProvider>
      {/* <FilteringExample/> */}
    </>
  );
}
