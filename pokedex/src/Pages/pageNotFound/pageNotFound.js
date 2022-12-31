import styles from './pageNotFound.module.css'

import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='container'>
        <div className={styles.content_page}>
            <h1>404</h1>
            <h4>Pagina não encontrada <Link to="/">VOLTAR</Link> </h4>
        </div>
    </div>
  )
}

export default PageNotFound