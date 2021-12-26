const { configure } = require("enzyme");
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
