import WorkflowControlPanel from './components/ControlPanels/WorkflowControlPanel';
import { workflow } from './reducer';

const applyConfig = (config) => {
  config.settings.controlpanels = [
    ...(config.settings.controlpanels || []),
    {
      '@id': '/workflowmanager-controlpanel', // Unique ID for your panel
      group: 'Plone Configuration',
      title: 'Workflow Manager', // Display name in Site Setup
    },
  ];
  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/controlpanel/workflowmanager-controlpanel',
      component: WorkflowControlPanel,
    },
  ];
  config.settings.apiPath =
    process.env.RAZZLE_API_PATH || 'http://localhost:8080/Plone';
  config.addonReducers = {
    ...config.addonReducers,
    workflow,
  };
  return config;
};

export default applyConfig;
