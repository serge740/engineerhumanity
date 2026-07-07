import { PrismaService } from "../../prisma/prisma.service";
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
export declare class SitesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(adminId: string): Promise<({
        _count: {
            pages: number;
            components: number;
            assets: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        adminId: string;
        domain: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        globalCSS: string;
        globalJS: string;
        version: number;
        published: boolean;
    })[]>;
    findOne(id: string, adminId: string): Promise<{
        pages: {
            id: string;
            updatedAt: Date;
            version: number;
            published: boolean;
            slug: string;
            title: string;
        }[];
        components: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            siteId: string;
            html: import("@prisma/client/runtime/library").JsonValue;
            tag: string;
            modalHtml: import("@prisma/client/runtime/library").JsonValue | null;
            type: string;
            schema: import("@prisma/client/runtime/library").JsonValue | null;
            collectionId: string | null;
        }[];
        assets: {
            id: string;
            createdAt: Date;
            name: string;
            siteId: string;
            url: string;
            type: string;
            publicId: string | null;
            size: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        adminId: string;
        domain: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        globalCSS: string;
        globalJS: string;
        version: number;
        published: boolean;
    }>;
    create(adminId: string, dto: CreateSiteDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        adminId: string;
        domain: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        globalCSS: string;
        globalJS: string;
        version: number;
        published: boolean;
    }>;
    update(id: string, adminId: string, dto: UpdateSiteDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        adminId: string;
        domain: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        globalCSS: string;
        globalJS: string;
        version: number;
        published: boolean;
    }>;
    remove(id: string, adminId: string): Promise<{
        message: string;
    }>;
    private assertOwner;
}
