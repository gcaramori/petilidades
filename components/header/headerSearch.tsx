import SearchIcon from '@mui/icons-material/Search';

export default function HeaderSearch() {
    const handleSearch = () => {
        console.log('Buscar!')
    }

    return (
        <>
            <button type="button" className="absolute top-[.6rem] left-4 z-30" onClick={handleSearch}>
                <SearchIcon />
            </button>

            <input type="text" name="search" className="py-3 pl-16 w-80 z-20 block rounded-full text-sm font-semibold text-black bg-gray-100 border border-grayBorder" placeholder="Busque por produtos" />
        </>
    )
}