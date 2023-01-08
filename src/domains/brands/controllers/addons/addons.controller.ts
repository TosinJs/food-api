import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Role } from 'src/types/enum';
import { createSuccessResponse } from 'src/utils/responseBuilder.utils';
import { Roles } from '../../decorators/roles.decorator';
import { CreateAddonDto } from '../../dto/addons/create-addon.dto';
import { UpdateAddonDto } from '../../dto/addons/update-addon.dto';
import { AddonsService } from '../../services/addons/addons.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Addons')
@ApiBearerAuth()
@Controller('brands/:brandId/addons')
export class AddonsController {
    constructor(private readonly addonService: AddonsService) {}

    @Post()
    @Roles(Role.Admin)
    async create(
        @Param('brandId') brandId: string,
        @Body() createAddonDto: CreateAddonDto
        ) {
        return createSuccessResponse(
            HttpStatus.CREATED,
            'Success',
            await this.addonService.create(brandId, createAddonDto)
        )
    }

    @Get()
    @Roles(Role.Admin)
    async findAll(@Param('brandId') brandId: string) {
        const addons = await this.addonService.findAll(brandId)
        if (addons.length < 1) {
            throw new HttpException(
                'addons not found for this brand',
                HttpStatus.NOT_FOUND,
                { cause: new Error('Addons Not Found') }
            )
        }
        return createSuccessResponse(HttpStatus.OK, 'Success', addons)
    }

    @Get(':addonId')
    @Roles(Role.Admin)
    async findOne(
        @Param('brandId') brandId: string,
        @Param('addonId') addonId: string
        ) {
        const addon = await this.addonService.findOne(brandId, addonId)
        if (!addon) {
            throw new HttpException(
                'addon not found',
                HttpStatus.NOT_FOUND,
                { cause: new Error('Addon Not Found') }
            )
        }
        return createSuccessResponse(HttpStatus.OK, 'Success', addon)
    }

    @Patch(':addonId')
    @Roles(Role.Admin)
    async update(
        @Param('brandId') brandId: string,
        @Param('addonId') addonId: string,
        @Body() updateAddonDto: UpdateAddonDto
    ) {
        const res = await this.addonService.update(brandId, addonId, updateAddonDto)
        if (!res) {
            throw new HttpException(
                'invalid brand id or addon id - update failed',
                HttpStatus.BAD_REQUEST,
                { cause: new Error('Failed to Update Addon') }
            )
        }
        return createSuccessResponse(HttpStatus.OK, 'Success', res)
    }

    @Delete(':addonId')
    @Roles(Role.Admin)
    async delete(
        @Param('brandId') brandId: string,
        @Param('addonId') addonId: string
        ) {
        const res = await this.addonService.delete(brandId, addonId)
        if (res == 0) {
            throw new HttpException(
                'invalid brand id or addon id - delete failed',
                HttpStatus.BAD_REQUEST,
                { cause: new Error('Failed to Update Addon') }
            )
        }
        return createSuccessResponse(HttpStatus.OK, 'Success', res)
    }
}