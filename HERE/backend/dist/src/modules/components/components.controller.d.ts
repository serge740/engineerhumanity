import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { RequestWithAdmin } from "../../common/interfaces/admin.interface";
export declare class ComponentsController {
    private readonly componentsService;
    constructor(componentsService: ComponentsService);
    findAll(siteId: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }[]>;
    findOne(siteId: string, id: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }>;
    create(siteId: string, dto: CreateComponentDto, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }>;
    update(siteId: string, id: string, dto: UpdateComponentDto, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }>;
    remove(siteId: string, id: string, req: RequestWithAdmin): Promise<{
        message: string;
    }>;
}
