import { PrismaService } from "../../prisma/prisma.service";
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
export declare class ComponentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private assertSiteOwner;
    findAll(siteId: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }[]>;
    findOne(siteId: string, id: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }>;
    create(siteId: string, adminId: string, dto: CreateComponentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }>;
    update(siteId: string, id: string, adminId: string, dto: UpdateComponentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: import("@prisma/client/runtime/library").JsonValue;
        tag: string;
    }>;
    remove(siteId: string, id: string, adminId: string): Promise<{
        message: string;
    }>;
}
