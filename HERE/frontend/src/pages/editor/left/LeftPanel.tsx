import { useEditorStore } from '../../../stores/editorStore';
import { AddElementsPanel } from './AddElementsPanel';
import { LayersPanel }      from './LayersPanel';
import { SectionsPanel }    from './SectionsPanel';
import { VariablesPanel }   from './VariablesPanel';
import { TemplatesPanel }   from './TemplatesPanel';

export function LeftPanel() {
  const mode       = useEditorStore(s => s.mode);
  const componentMeta = useEditorStore(s => s.componentMeta);
  const leftTab    = useEditorStore(s => s.leftTab);
  const setLeftTab = useEditorStore(s => s.setLeftTab);

  const showTemplates = mode === 'component' && componentMeta?.type === 'dynamic';

  return (
    <div className="l-left">
      {/* Tabs */}
      <div className="l-panel-tabs">
        <button
          className={'l-panel-tab' + (leftTab === 'layers' ? ' active' : '')}
          onClick={() => setLeftTab('layers')}
        >
          Layers
        </button>
        <button
          className={'l-panel-tab' + (leftTab === 'insert' ? ' active' : '')}
          onClick={() => setLeftTab('insert')}
        >
          Insert
        </button>
        {mode === 'page' && (
          <button
            className={'l-panel-tab' + (leftTab === 'sections' ? ' active' : '')}
            onClick={() => setLeftTab('sections')}
          >
            Sections
          </button>
        )}
        {showTemplates && (
          <button
            className={'l-panel-tab' + (leftTab === 'templates' ? ' active' : '')}
            onClick={() => setLeftTab('templates')}
          >
            Templates
          </button>
        )}
        {mode === 'component' && (
          <button
            className={'l-panel-tab' + (leftTab === 'variables' ? ' active' : '')}
            onClick={() => setLeftTab('variables')}
          >
            Variables
          </button>
        )}
      </div>

      {/* Content */}
      {leftTab === 'layers'    && <LayersPanel />}
      {leftTab === 'insert'    && <AddElementsPanel />}
      {leftTab === 'sections'  && mode === 'page' && <SectionsPanel />}
      {leftTab === 'templates' && showTemplates   && <TemplatesPanel />}
      {leftTab === 'variables' && mode === 'component' && <VariablesPanel />}
    </div>
  );
}
