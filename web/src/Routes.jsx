import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import UploaderLayout from './layouts/UploaderLayout/UploaderLayout'

const Routes = () => {
  return (
    <Router>

      <Set wrap={UploaderLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Set wrap={ScaffoldLayout} titleTo="files" buttonLabel="Fechar" buttonTo="home">
        <Route path="/files/new" page={FileNewFilePage} name="newFile" />
        <Route path="/files/{id:Int}/edit" page={FileEditFilePage} name="editFile" />
        <Route path="/files/{id:Int}" page={FileFilePage} name="file" />
        <Route path="/files" page={FileFilesPage} name="files" />
      </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
