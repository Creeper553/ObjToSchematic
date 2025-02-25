import { FallableBehaviour } from './block_mesh';
import { Bounds } from './bounds';
import { TBlockMeshBufferDescription, TMeshBufferDescription, TVoxelMeshBufferDescription } from './buffer';
import { RGBAUtil } from './colour';
import { TExporters } from './exporters/exporters';
import { MaterialMap } from './mesh';
import { TMessage } from './ui/console';
import { ColourSpace } from './util';
import { AppError } from './util/error_util';
import { TAxis } from './util/type_util';
import { TDithering } from './util/type_util';
import { Vector3 } from './vector';
import { TVoxelOverlapRule } from './voxel_mesh';
import { TVoxelisers } from './voxelisers/voxelisers';

export namespace InitParams {
    export type Input = {
    }

    export type Output = {
    }
}

export namespace SettingsParams {
    export type Input = {
        language: string,
    }

    export type Output = {
    }
}

export namespace ImportParams {
    export type Input = {
        file: File,
        rotation: Vector3,
    }

    export type Output = {
        triangleCount: number,
        dimensions: Vector3,
        materials: MaterialMap
    }
}

export namespace RenderMeshParams {
    export type Input = {

    }

    export type Output = {
        buffers: TMeshBufferDescription[],
        dimensions: Vector3
    }
}

export namespace SetMaterialsParams {
    export type Input = {
        materials: MaterialMap
    }

    export type Output = {
        materials: MaterialMap,
        materialsChanged: string[],
    }
}

export namespace VoxeliseParams {
    export type Input = {
        constraintAxis: TAxis,
        voxeliser: TVoxelisers,
        size: number,
        useMultisampleColouring: boolean,
        enableAmbientOcclusion: boolean,
        voxelOverlapRule: TVoxelOverlapRule,
    }

    export type Output = {

    }
}

/*
export namespace RenderVoxelMeshParams {
    export type Input = {
        desiredHeight: number,
        enableAmbientOcclusion: boolean,
    }

    export type Output = {
        buffer: TVoxelMeshBufferDescription,
        dimensions: Vector3,
        voxelSize: number,
    }
}
*/

export namespace RenderNextVoxelMeshChunkParams {
    export type Input = {
        desiredHeight: number,
        enableAmbientOcclusion: boolean,
    }

    export type Output = {
        buffer: TVoxelMeshBufferDescription,
        dimensions: Vector3,
        voxelSize: number,
        moreVoxelsToBuffer: boolean,
        isFirstChunk: boolean,
    }
}

export type TAtlasId = string;
export type TPaletteId = string;

export namespace AssignParams {
    export type Input = {
        textureAtlas: TAtlasId,
        blockPalette: string[],
        dithering: TDithering,
        ditheringMagnitude: number,
        colourSpace: ColourSpace,
        fallable: FallableBehaviour,
        resolution: RGBAUtil.TColourAccuracy,
        calculateLighting: boolean,
        lightThreshold: number,
        contextualAveraging: boolean,
        errorWeight: number,
    }

    export type Output = {

    }
}

export namespace RenderNextBlockMeshChunkParams {
    export type Input = {
        textureAtlas: TAtlasId,
    }

    export type Output = {
        buffer: TBlockMeshBufferDescription,
        bounds: Bounds,
        atlasTexturePath: string,
        atlasSize: number,
        moreBlocksToBuffer: boolean,
        isFirstChunk: boolean,
    }
}

/*
export namespace RenderBlockMeshParams {
    export type Input = {
        textureAtlas: TAtlasId,
    }

    export type Output = {
        buffer: TBlockMeshBufferDescription,
        dimensions: Vector3,
        atlasTexturePath: string,
        atlasSize: number,
    }
}
*/

export namespace ExportParams {
    export type Input = {
        exporter: TExporters,
    }

    export type Output = {
        buffer: Buffer,
        extension: string,
    }
}

export type TaskParams =
    | { type: 'Started', taskId: string }
    | { type: 'Progress', taskId: string, percentage: number }
    | { type: 'Finished', taskId: string }

export type TToWorkerMessage =
    | { action: 'Init', params: InitParams.Input }
    | { action: 'Settings', params: SettingsParams.Input }
    | { action: 'Import', params: ImportParams.Input }
    | { action: 'SetMaterials', params: SetMaterialsParams.Input }
    | { action: 'RenderMesh', params: RenderMeshParams.Input }
    | { action: 'Voxelise', params: VoxeliseParams.Input }
    //| { action: 'RenderVoxelMesh', params: RenderVoxelMeshParams.Input }
    | { action: 'RenderNextVoxelMeshChunk', params: RenderNextVoxelMeshChunkParams.Input }
    | { action: 'Assign', params: AssignParams.Input }
    //| { action: 'RenderBlockMesh', params: RenderBlockMeshParams.Input }
    | { action: 'RenderNextBlockMeshChunk', params: RenderNextBlockMeshChunkParams.Input }
    | { action: 'Export', params: ExportParams.Input }

export type TFromWorkerMessage =
    | { action: 'KnownError', error: AppError }
    | { action: 'UnknownError', error: Error }
    | { action: 'Progress', payload: TaskParams }
    | ({ messages: TMessage[] } & (
        | { action: 'Init', result: InitParams.Output }
        | { action: 'Settings', result: SettingsParams.Output }
        | { action: 'Import', result: ImportParams.Output }
        | { action: 'SetMaterials', result: SetMaterialsParams.Output }
        | { action: 'RenderMesh', result: RenderMeshParams.Output }
        | { action: 'Voxelise', result: VoxeliseParams.Output }
        //| { action: 'RenderVoxelMesh', result: RenderVoxelMeshParams.Output }
        | { action: 'RenderNextVoxelMeshChunk', result: RenderNextVoxelMeshChunkParams.Output }
        | { action: 'Assign', result: AssignParams.Output }
        //| { action: 'RenderBlockMesh', result: RenderBlockMeshParams.Output }
        | { action: 'RenderNextBlockMeshChunk', result: RenderNextBlockMeshChunkParams.Output }
        | { action: 'Export', result: ExportParams.Output }));
