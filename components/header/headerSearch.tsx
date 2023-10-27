import { AiOutlineSearch } from 'react-icons/ai'

export default function HeaderSearch() {
  const handleSearch = () => {
    console.log('Buscar!')
  }

  return (
    <div className="flex justify-center items-center relative w-full xl:w-80 px-4 md:px-10 lg:px-0">
      <button
        type="button"
        className="absolute top-[.2rem] xl:top-[.6rem] left-10 md:left-16 lg:left-4 z-30"
        onClick={handleSearch}
      >
        <AiOutlineSearch size="1.5rem" />
      </button>

      <input
        type="text"
        name="search"
        className="py-2 xl:py-3 pl-16 w-full z-20 block rounded-full text-xs xl:text-sm font-semibold text-black bg-gray-100 border border-grayBorder"
        placeholder="Busque por produtos..."
      />
    </div>
  )
}
