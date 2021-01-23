import app from './config/app';
import "./config/database";

app.listen(app.get('port'));
