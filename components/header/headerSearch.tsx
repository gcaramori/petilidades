import { AiOutlineSearch } from 'react-icons/ai'

export default function HeaderSearch() {
  const handleSearch = () => {
    console.log('Buscar!')
  }

  return (
    <div className="flex justify-center items-center relative w-full xl:w-80 px-4 md:px-10 lg:px-0">
      <button
        type="button"
        className="absolute inset-y-0 right-10 md:right-16 lg:right-4 my-auto z-30"
        onClick={handleSearch}
      >
        <AiOutlineSearch size="1.5rem" />
      </button>

      <input
        type="text"
        name="search"
        className="py-2 px-6 w-full z-20 block rounded-full text-xs font-semibold text-black bg-gray-100 border border-grayBorder"
        placeholder="Busque por produtos..."
      />
    </div>
  )
}
