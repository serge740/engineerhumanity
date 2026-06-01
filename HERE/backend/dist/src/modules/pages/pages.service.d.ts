import { PrismaService } from "../../prisma/prisma.service";
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toSlug;
    private uniqueSlug;
    private assertSiteOwner;
    findAll(siteId: string, adminId: string): Promise<{
        id: string;
        slug: string;
        title: string;
        description: string | null;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(siteId: string, adminId: string, dto: CreatePageDto): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(siteId: string, slug: string, adminId: string, dto: UpdatePageDto): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    publish(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unpublish(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(siteId: string, slug: string, adminId: string): Promise<{
        message: string;
    }>;
    duplicate(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
