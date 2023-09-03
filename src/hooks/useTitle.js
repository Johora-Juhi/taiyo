import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Taiyo`;
    }, [title])
}

export default useTitle;