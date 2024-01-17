import { useRouter } from 'next/router';
import Pageselector from './PageSelector';
import SolSelector from './SolSelector';

const Filters = () => {
    const router = useRouter();
    const sol = Number(router.query.sol) || 1;
    const page = Number(router.query.page) || 1;

    const handleSoleChange = (selectedSol: number) => {
        router.push({
            pathname: '/',
            query: { ...router.query, sol: selectedSol },
        });
    };

    const handlePageChange = (selectedPage: number) => {
        router.push({
            pathname: '/',
            query: { ...router.query, page: selectedPage },
        });
    };

    return (
        <div className='flex w-1/3 rounded-lg shadow-lg  bg-white m-5 p-3'>
            <SolSelector onChange={handleSoleChange} value={sol} />
            <Pageselector onChange={handlePageChange} value={page} />
        </div>
    );
};

export default Filters;
