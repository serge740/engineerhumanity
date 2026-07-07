import { Prisma } from '@prisma/client';
import { PrismaService } from "../../prisma/prisma.service";
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
export declare class ComponentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private assertSiteOwner;
    private assertCollectionInSite;
    private validateType;
    findAll(siteId: string, adminId: string): Promise<({
        collection: {
            id: string;
            name: string;
            slug: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: Prisma.JsonValue;
        tag: string;
        modalHtml: Prisma.JsonValue | null;
        type: string;
        schema: Prisma.JsonValue | null;
        collectionId: string | null;
    })[]>;
    findOne(siteId: string, id: string, adminId: string): Promise<{
        collection: {
            id: string;
            name: string;
            slug: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: Prisma.JsonValue;
        tag: string;
        modalHtml: Prisma.JsonValue | null;
        type: string;
        schema: Prisma.JsonValue | null;
        collectionId: string | null;
    }>;
    create(siteId: string, adminId: string, dto: CreateComponentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: Prisma.JsonValue;
        tag: string;
        modalHtml: Prisma.JsonValue | null;
        type: string;
        schema: Prisma.JsonValue | null;
        collectionId: string | null;
    }>;
    update(siteId: string, id: string, adminId: string, dto: UpdateComponentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        siteId: string;
        html: Prisma.JsonValue;
        tag: string;
        modalHtml: Prisma.JsonValue | null;
        type: string;
        schema: Prisma.JsonValue | null;
        collectionId: string | null;
    }>;
    remove(siteId: string, id: string, adminId: string): Promise<{
        message: string;
    }>;
}
