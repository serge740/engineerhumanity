import { useEditorStore } from '../../../stores/editorStore';
import { AddElementsPanel } from './AddElementsPanel';
import { LayersPanel }      from './LayersPanel';
import { SectionsPanel }    from './SectionsPanel';

export function LeftPanel() {
  const leftTab    = useEditorStore(s => s.leftTab);
  const setLeftTab = useEditorStore(s => s.setLeftTab);

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
        <button
          className={'l-panel-tab' + (leftTab === 'sections' ? ' active' : '')}
          onClick={() => setLeftTab('sections')}
        >
          Sections
        </button>
      </div>

      {/* Content */}
      {leftTab === 'layers'   && <LayersPanel />}
      {leftTab === 'insert'   && <AddElementsPanel />}
      {leftTab === 'sections' && <SectionsPanel />}
    </div>
  );
}
